import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import { getAllAuthors } from "../../../store/actions/adminActions/authorActions";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import AdminAddModal from "../../../components/AdminAddModal/AdminAddModal";
import "./authors.css";

function AddAuthor() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const authors = useSelector((s) => s.authors.authors);
  useEffect(() => {
    dispatch(getAllAuthors());
  }, []);

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="genres">
      <Container>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleShowModal}
        >
          Добавить нового исполнителя
        </Button>
        <Table
          title={"Исполнители"}
          data={authors}
          isGenres={false}
          isPlayLists={false}
          isAuthors={true}
          isTracks={false}
        />
        {openModal && (
          <AdminAddModal
            isGenres={false}
            isAuthors={true}
            isTracks={false}
            openModal={openModal}
            handleShowModal={handleShowModal}
          />
        )}
      </Container>
    </div>
  );
}

export default AddAuthor;
