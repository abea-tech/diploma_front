import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { getAccessToken, setAccessTokenHeader, logout } from "./auth";

const Buttons = ({
  isUserLoggedIn,
  onOpenLoginModal,
  onOpenFirstModal,
  onOpenListDeliveriesModal,
  onOpenRegisterModal,
  onOpenTransportModal,
  onGetActiveDelivery,
}) => {
  const handleLogin = (accessToken) => {
    setAccessTokenHeader(accessToken);
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      handleLogin(accessToken);
    }
  }, []);

  const logOut = () => {
    logout();
    window.location.reload();
  };
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const setInActive = () => {
    setIsActive(false);
  };

  useEffect(() => {
    onGetActiveDelivery(isActive);
  }, [isActive]);
  return (
    <>
      {isUserLoggedIn ? (
        <>
          <Button
            colorScheme={"orange"}
            variant={isActive ? "solid" : "outline"}
            marginTop="0"
            marginBottom="4"
            onClick={() => {
              toggleActive();
            }}
          >
            Активные
          </Button>
          <Button
            colorScheme="orange"
            marginTop="0"
            marginBottom="4"
            onClick={() => {
              setInActive();
              onOpenListDeliveriesModal("history");
            }}
          >
            История
          </Button>
          <Button
            colorScheme="orange"
            marginTop="0"
            onClick={() => {
              setInActive();
              onOpenListDeliveriesModal("pending");
            }}
            marginBottom="4"
          >
            В ожидании
          </Button>
          <Button
            colorScheme="orange"
            marginTop="0"
            onClick={onOpenFirstModal}
            marginBottom="4"
          >
            Маршрут
          </Button>
          <Button
            colorScheme="orange"
            marginTop="0"
            onClick={onOpenRegisterModal}
            marginBottom="4"
          >
            Водители
          </Button>
          <Button
            colorScheme="orange"
            marginTop="0"
            onClick={onOpenTransportModal}
            marginBottom="4"
          >
            Транспорт
          </Button>
          <Button
            colorScheme="orange"
            marginTop="0"
            marginBottom="4"
            onClick={logOut}
          >
            Выйти
          </Button>
        </>
      ) : (
        <Button
          colorScheme="orange"
          onClick={onOpenLoginModal}
          marginTop="0"
          marginBottom="4"
        >
          Войти
        </Button>
      )}
    </>
  );
};

export default Buttons;
