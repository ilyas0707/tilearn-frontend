import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor"; //библиотека для создания редактора
import { selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import axios from "../../axios";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
  const { id } = useParams();
  const history = useHistory();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      //формат которые позволяет отправлять картинку на бэк
      const formData = new FormData();
      //formData.append(name, value) – добавляет к объекту поле с именем name и значением value
      formData.append("image", event.target.files[0]);
      //отправляем файл на бэк
      const { data } = await axios.post("./upload", formData);
      //получаем файл из запроса
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Error when uploading a file");
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        text,
        tags: tags.split(","),
        imageUrl,
      };
      //отправка поста на бэк
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEditing ? id : data._id;
      history.push(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Error when creating an article");
    }
  };

  //редактирование статьи
  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(","));
        })
        .catch((err) => {
          console.warn(err);
          alert("Error when receiving the article");
        });
    }
  }, []);

  const onClickRemoveImage = () => {
    //удаляет картинку, но на беке остается
    setImageUrl("");
  };

  //котролируемый редактор
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter the text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  //если не авторизован, то на главную
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Redirect to='/' />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant='outlined'
        size='large'
      >
        Upload preview
      </Button>
      <input
        ref={inputFileRef}
        type='file'
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant='contained'
            color='error'
            onClick={onClickRemoveImage}
          >
            Remove
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:5000${imageUrl}`}
            alt='Uploaded'
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='The title of the article...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Tags'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size='large' variant='contained'>
          {isEditing ? "Save" : "Publish"}
        </Button>
        <a href='/'>
          <Button size='large'>Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
