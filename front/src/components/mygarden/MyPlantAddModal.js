import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";

import "./react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import * as Api from "../../api";
import defaultImg from "../../imgs/default_image.png";
import { useEffect } from "react";

const MyPlantAddModal = ({ openAddPlant, setOpenAddPlant }) => {
  // 상태 관리
  const [image, setImage] = useState({
    imageFile: "",
    previewURL: defaultImg,
  });
  const [species, setSpecies] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [term, setTerm] = useState("");
  const [lastSupplyDate, setLastSupplyDate] = useState(new Date());

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        imageFile: e.target.files[0],
        previewURL: fileReader.result,
      });
    };
  };

  const deleteImage = () => {
    setImage({
      imageFile: "",
      previewURL: defaultImg,
    });
  };
  // 식물 등록하기 버튼 클릭 시 넘겨주는 데이터

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image.imageFile);
    try {
      const res = await Api.postForm("image", formData);
      setImage({
        imageFile: "",
        previewURL: defaultImg,
      });
      await Api.post("plants", {
        species,
        nickname,
        imageURL: res.data.imageURL,
        description,
        lastWater: lastSupplyDate,
        termWater: Number(term),
      });
      setOpenAddPlant(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      open={openAddPlant}
      onClose={() => {
        setOpenAddPlant(false);
      }}
    >
      <DialogTitle sx={{ pt: 2, bgcolor: "white" }}>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenAddPlant(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ bgcolor: "white" }}>
          <DialogContentText
            align="center"
            sx={{
              color: "#64a68a",
              mb: 3,
              fontSize: "1rem",
            }}
          >
            내 식물 등록
          </DialogContentText>
          <DialogContentText
            align="center"
            sx={{ color: "#64a68a", fontWeight: "bold", mb: 3 }}
          >
            아이의 사진을 먼저 등록해주세요!
          </DialogContentText>

          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={image.previewURL}
              width="50%"
              height="50%"
            />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Button
              component="label"
              sx={{
                p: 2,
                color: "#64a68a",
                border: "2px solid #64a68a",
                borderRadius: "10%",
                mr: 2,
              }}
            >
              등록
              <TextField
                required
                type="file"
                accept="image/*"
                sx={{ display: "none" }}
                onChange={saveImage}
              />
            </Button>
            <Button
              sx={{
                p: 2,
                color: "#64a68a",
                border: "2px solid #64a68a",
                borderRadius: "10%",
              }}
              onClick={deleteImage}
            >
              삭제
            </Button>
          </Box>
          <TextField
            required
            sx={{ mt: 2, bgcolor: "white" }}
            type="text"
            label="식물 종류"
            fullWidth
            variant="outlined"
            color="success"
            value={species}
            onChange={(e) => {
              setSpecies(e.target.value);
            }}
          />
          <TextField
            required
            sx={{ mt: 2, bgcolor: "white" }}
            label="애칭"
            type="text"
            fullWidth
            variant="outlined"
            color="success"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <TextField
            sx={{ mt: 2, bgcolor: "white" }}
            label="한 줄 소개"
            type="text"
            fullWidth
            variant="outlined"
            color="success"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            required
            sx={{ mt: 2, bgcolor: "white" }}
            label="물 주는 주기"
            type="number"
            fullWidth
            variant="outlined"
            color="success"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
          <DatePicker
            selected={lastSupplyDate}
            onChange={(date) => setLastSupplyDate(date)}
            locale={ko}
            dateFormat="yyyy.MM.dd (eee)"
            showPopperArrow={false}
            customInput={
              // 날짜 뜨는 인풋 커스텀
              <TextField
                label="🗓 마지막으로 물 준 날"
                fullWidth
                sx={{ mt: 2 }}
              />
            }
          />
        </DialogContent>
        <DialogActions sx={{ pb: 5, bgcolor: "white" }}>
          <Button
            sx={{ mx: "auto", bgcolor: "#64a68a", color: "white" }}
            type="submit"
          >
            추가
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default MyPlantAddModal;
