"use client";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import AOS from "aos";

import Image from "next/image";
import { useEffect, useState } from "react";
import img1 from "../../assets/imageGallery/img10.jpeg";
import img8 from "../../assets/imageGallery/img11.jpeg";
import img2 from "../../assets/imageGallery/img2.jpg";
import img3 from "../../assets/imageGallery/img3.jpg";
import img4 from "../../assets/imageGallery/img4.jpg";
import img5 from "../../assets/imageGallery/img5.jpg";
import img6 from "../../assets/imageGallery/img6.jpg";
import img7 from "../../assets/imageGallery/img7.jpg";

const ImageGallery = () => {
  const [fullImageSrc, setFullImageSrc] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: true,
    });
  }, []);

  const openFullImage = (src: string) => {
    setFullImageSrc(src);
  };

  const closeFullImage = () => {
    setFullImageSrc(null);
  };

  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <>
      <Modal
        open={Boolean(fullImageSrc)}
        onClose={closeFullImage}
        aria-labelledby="full-image"
        aria-describedby="full-size-image-view"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {fullImageSrc && (
            <>
              <Image
                src={fullImageSrc}
                width={500}
                height={500}
                alt="Full Image"
                id="fullImg"
                style={{ maxWidth: "90%", maxHeight: "90%" }}
                data-aos="zoom-in"
              />
              <IconButton
                onClick={closeFullImage}
                sx={{
                  position: "absolute",
                  top: -150,
                  right: -380,
                  color: "#fff",
                  background: "#c11414",
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </>
          )}
        </Box>
      </Modal>
      <Box sx={{ width: "80%", margin: "40px auto 50px" }}>
        <Typography
          color={"primary.main"}
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            fontFamily: "-moz-initial",
          }}
          data-aos="fade-up"
        >
          Where All the Stories From Your Travels Find Their Home. <br />{" "}
          <span style={{ color: "#c11414" }}>Share Your Story</span>
        </Typography>
      </Box>

      <Box sx={{ width: "80%", margin: "40px auto 50px" }}>
        <Grid container spacing={3}>
          {images.map((img, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "0.4s",
                  "&:hover img": {
                    transform: "scale(0.8) rotate(-20deg)",
                    borderRadius: "20px",
                    boxShadow: "0 32px 75px rgba(68, 77, 136, 0.2)",
                  },
                }}
                onClick={() => openFullImage(img.src)}
              >
                <Image
                  src={img.src}
                  width={400}
                  height={400}
                  alt="img-gallery"
                  style={{ width: "100%", transition: "transform 0.4s" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ImageGallery;
