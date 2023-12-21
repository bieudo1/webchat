import React, { useEffect } from "react";
import { Card, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";

function UserProfilePage() {
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  useEffect(() => {
    if (userId) {
    }
  }, [dispatch, userId]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
