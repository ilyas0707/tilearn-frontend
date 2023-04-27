import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Chip } from "@mui/material";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export const ProfileCard = ({ profile }) => {
  function getInitials(fullName = "") {
    const words = fullName.split(" ");
    const initials = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length > 0) {
        initials.push(word.charAt(0).toUpperCase());
      }
    }

    return initials.join("");
  }
  // TODO: Manage translations with i18n
  const rankName = "of Kyrgyz language";
  const profileCardTitleText = "Profile";

  return (
    <Box>
      <Card
        sx={{
          flex: 1,
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
          display: "flex",
          paddingTop: "16px",
          marginBottom: "30px",
        }}
      >
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", padding: "0 30px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0 20px 0",
              }}
            >
              <Box>
                <Typography variant='h4' color='text.primary' component='div'>
                  {profileCardTitleText}
                </Typography>
                <Typography
                  sx={{
                    marginTop: "7px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  variant='h6'
                  color='text.primary'
                  component='div'
                >
                  <Chip label={`Current Rank:`} />
                  <Avatar
                    sx={{
                      bgcolor: "#CD7F32",
                      color: "#CD7F32",
                      width: 20,
                      height: 20,
                      marginLeft: "10px",
                      boxShadow:
                        "0 0 0 4px #fff, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)",
                    }}
                  />
                </Typography>
                <Typography
                  sx={{ marginTop: "7px" }}
                  variant='h6'
                  color='text.primary'
                  component='div'
                >
                  <Chip label={`535 XP`} />
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Avatar sx={{ bgcolor: "#000", width: 64, height: 64 }}>
                  {getInitials(profile?.fullName)}
                </Avatar>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "24px 0",
              }}
            >
              <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <AccountCircleOutlinedIcon />
                  <Typography
                    sx={{
                      textAlign: "right",
                      margin: "0 8px",
                      fontWeight: 700,
                    }}
                    variant='body1'
                    color='text.primary'
                    component='div'
                  >
                    {profile?.fullName}
                  </Typography>
                </Box>
                <Typography
                  sx={{ textAlign: "right", margin: "0 8px" }}
                  variant='body1'
                  color='text.secondary'
                  component='div'
                >
                  Tilearned at{" "}
                  {new Date(profile?.createdAt).toLocaleDateString("en-GB")}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "24px 0",
              }}
            >
              <EmailOutlinedIcon />
              <Typography
                sx={{ textAlign: "right", margin: "0 8px", fontWeight: 500 }}
                variant='body1'
                color='text.primary'
                component='div'
              >
                {profile?.email}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <VerticalTimeline>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #fff" }}
          date='250 XP'
          iconStyle={{ background: "#848688", color: "#000" }}
        >
          <h3 className='vertical-timeline-element-title'>Novice {rankName}</h3>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #fff" }}
          date='500 XP'
          iconStyle={{ background: "#CD7F32", color: "#000" }}
        >
          <h3 className='vertical-timeline-element-title'>
            Apprentice {rankName}
          </h3>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #fff" }}
          date='1000 XP'
          iconStyle={{ background: "#c6cece", color: "#000" }}
        >
          <h3 className='vertical-timeline-element-title'>
            Journeyman {rankName}
          </h3>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #fff" }}
          date='2000 XP'
          iconStyle={{ background: "#FFD700", color: "#000" }}
        >
          <h3 className='vertical-timeline-element-title'>Master {rankName}</h3>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{ background: "#fff", color: "#000" }}
          contentArrowStyle={{ borderRight: "7px solid  #fff" }}
          date='4000 XP'
          iconStyle={{ background: "#38a2b5", color: "#000" }}
        >
          <h3 className='vertical-timeline-element-title'>Legend {rankName}</h3>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Box>
  );
};
