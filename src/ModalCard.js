import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ChakraProvider,
  FormControl,
  Input,
  IconButton,
  Box,
  Flex,
  Stack,
  ButtonGroup,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, ChevronDownIcon } from "@chakra-ui/icons";

import "./Sidebar.css";
import DynamicInputFields from "./InputFields";
import DriverModalCard from "./DriverModal";
import LoginModal from "./Login";
import RegisterModal from "./Register";
import HistoryModal from "./History";
import HistoryDetailModal from "./HistoryDetail";
import PendingModal from "./Pending";
import PendingDetailModal from "./PendingDetail";
import ActiveDeliveriesModal from "./ActiveDeliveries";
import ListDeliveriesModal from "./ListDeliveries";
import ListDeliveriesDetailModal from "./ListDeliveriesDetail";
import { getAccessToken, setAccessTokenHeader, logout } from "./auth";
import Buttons from "./Pages";
import RouteModal from "./RouteModal";
import ChooseDriverModal from "./ChooseDriver";
import RegisterDriverModal from "./RegisterDriver";
import RegisterCarModal from "./RegisterCar";
import ChooseCarModal from "./ChooseCar";
import axios from "axios";
import ListDriverModal from "./ListDeliveryman";
import ListCarModal from "./ListCars";

function ModalCard({ onClick, getDelivery, updateMarkers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [numFields, setNumFields] = useState(1);
  const [modalType, setModalType] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [driverId, setDriverId] = useState("");
  const [deliveryGroup, setDeliveryGroup] = useState("");
  const [websockets, setWebsockets] = useState({});

  useEffect(() => {
    if (modalType) {
      onOpenListDeliveriesModal();
    }
  }, [modalType]);

  const getActiveDelivery = (state) => {
    console.log(state);
    if (state === true) {
      if (!websockets[driverId]) {
        const socket = new WebSocket("ws://127.0.0.1:8000/ws");

        socket.addEventListener("open", () => {
          console.log(
            `WebSocket connection established for driver ID ${driverId}`
          );
          setWebsockets((prevWebsockets) => ({
            ...prevWebsockets,
            [driverId]: socket,
          }));
        });

        socket.addEventListener("message", (event) => {
          const data = JSON.parse(event.data);
          updateMarkers(data.driver_id, data.location, data.path);
        });

        socket.addEventListener("close", () => {
          console.log(`WebSocket connection closed for driver ID ${driverId}`);
          setWebsockets((prevWebsockets) => {
            const updatedWebsockets = { ...prevWebsockets };
            delete updatedWebsockets[driverId];
            return updatedWebsockets;
          });
        });
      }
    } else {
      disconnectAllWebSockets();
    }
  };

  const listDeliveriesType = (type) => {
    if (type === "history") {
      setModalType("История");
      onOpenListDeliveriesModal();
      disconnectAllWebSockets();
    } else if (type === "pending") {
      setModalType("В ожидании");
      onOpenListDeliveriesModal();
      disconnectAllWebSockets();
    }
    // else if (type === "active") {

    //   // setModalType("Активные");
    // }
  };

  const disconnectAllWebSockets = () => {
    for (const driverId in websockets) {
      const socket = websockets[driverId];
      if (socket) {
        socket.close();
        console.log(`WebSocket connection closed for driver ID ${driverId}`);
      }
    }
    updateMarkers(null, null);
    setWebsockets({});
  };

  const {
    isOpen: isOpenAlertDialog,
    onOpen: onOpenAlertDialog,
    onClose: onCloseAlertDialog,
  } = useDisclosure();
  const {
    isOpen: isOpenFirstModal,
    onOpen: onOpenFirstModal,
    onClose: onCloseFirstModal,
  } = useDisclosure();
  const {
    isOpen: isOpenSecondModal,
    onOpen: onOpenSecondModal,
    onClose: onCloseSecondModal,
  } = useDisclosure();
  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  const {
    isOpen: isOpenRegisterModal,
    onOpen: onOpenRegisterModal,
    onClose: onCloseRegisterModal,
  } = useDisclosure();

  const {
    isOpen: isOpenListDeliveriesModal,
    onOpen: onOpenListDeliveriesModal,
    onClose: onCloseListDeliveriesModal,
  } = useDisclosure();

  const {
    isOpen: isOpenListDeliveriesDetailModal,
    onOpen: onOpenListDeliveriesDetailModal,
    onClose: onCloseListDeliveriesDetailModal,
  } = useDisclosure();
  const {
    isOpen: isOpenRegisterDriverModal,
    onOpen: onOpenRegisterDriverModal,
    onClose: onCloseRegisterDriverModal,
  } = useDisclosure();

  const {
    isOpen: isOpenTransportModal,
    onOpen: onOpenTransportModal,
    onClose: onCloseTransportModal,
  } = useDisclosure();

  const {
    isOpen: isOpenChooseCarModal,
    onOpen: onOpenChooseCarModal,
    onClose: onCloseChooseCarModal,
  } = useDisclosure();

  const {
    isOpen: isOpenListDriverModal,
    onOpen: onOpenListDriverModal,
    onClose: onCloseListDriverModal,
  } = useDisclosure();

  const {
    isOpen: isOpenListCarModal,
    onOpen: onOpenListCarModal,
    onClose: onCloseListCarModal,
  } = useDisclosure();

  const loginModalClosed = () => {
    onCloseLoginModal();
    // onOpenRegisterModal();
  };

  const listDeliveriesModalClosed = (deliveryGroup) => {
    onCloseListDeliveriesModal();
    setDeliveryGroup(deliveryGroup);
    onOpenListDeliveriesDetailModal();
    setModalType("");
  };

  const backToListDeliveriesModal = () => {
    onCloseListDeliveriesDetailModal();
    onOpenListDeliveriesModal();
  };

  const driverModalClosed = (driverId) => {
    onCloseRegisterDriverModal();
    setDriverId(driverId);
    onOpenChooseCarModal();
  };

  const listDriverModalClosed = (driverId) => {
    onCloseListDriverModal();
    setDriverId(driverId);
    onOpenChooseCarModal();
  };

  const listCarModalClosed = () => {
    onCloseTransportModal();
    onOpenListCarModal();
  };

  const driverRegisterModalClosed = () => {
    onCloseRegisterDriverModal();
    onOpenListDriverModal();
  };

  const closeListDeliveriesDetail = (delivery_group) => {
    onCloseListDeliveriesDetailModal();
    onClick(delivery_group);
  };

  const chooseDriverModal = (json_data) => {
    onCloseFirstModal();
    setJsonData(json_data);
    onOpenSecondModal();
  };

  const nullifyModalType = () => {
    onCloseListDeliveriesModal();
    setModalType("");
    console.log(modalType);
  };

  // Creating delivery
  const handleClick = (index) => {
    const token = getAccessToken();

    if (index) {
      const jsonDataAddresses = JSON.parse(jsonData);
      setJsonData(null);
      const jsonDataRequest = {
        deliveries: jsonDataAddresses.addresses,
        deliveryman: index,
        name: "test_delivery_group",
      };
      axios
        .post(
          "http://127.0.0.1:8000/api/delivery/delivery_group/",
          jsonDataRequest,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          onCloseSecondModal();
          onOpenAlertDialog();
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }
  };

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const accessToken = getAccessToken();
    console.log(accessToken);

    if (accessToken) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  return (
    <>
      <ChakraProvider>
        <AlertDialog
          motionPreset="slideInBottom"
          onClose={onCloseAlertDialog}
          isOpen={isOpenAlertDialog}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Отлично!</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Ваш заказ был добавлен во вкладку "В ожидании"!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="green" onClick={onCloseAlertDialog}>
                Хорошо
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <ButtonGroup
          spacing="0"
          size="lg"
          variant="outline"
          flexDirection="column"
          mt="0"
          width={"100%"}
        >
          <Buttons
            isUserLoggedIn={isUserLoggedIn}
            onOpenListDeliveriesModal={listDeliveriesType}
            onGetActiveDelivery={getActiveDelivery}
            onOpenLoginModal={onOpenLoginModal}
            onOpenRegisterModal={onOpenRegisterDriverModal}
            onOpenTransportModal={onOpenTransportModal}
            onOpenFirstModal={onOpenFirstModal}
          />
        </ButtonGroup>

        <RouteModal
          isOpen={isOpenFirstModal}
          onClose={onCloseFirstModal}
          chooseDriver={chooseDriverModal}
        />
        <ChooseDriverModal
          isOpen={isOpenSecondModal}
          onClose={onCloseSecondModal}
          handleClick={handleClick}
          json={jsonData !== null ? jsonData : undefined}
        />

        <LoginModal
          isOpen={isOpenLoginModal}
          onClose={onCloseLoginModal}
          onClick={loginModalClosed}
        />
        <RegisterModal
          isOpen={isOpenRegisterModal}
          onClose={onCloseRegisterModal}
        />
        <RegisterDriverModal
          isOpen={isOpenRegisterDriverModal}
          onClose={onCloseRegisterDriverModal}
          chooseCar={driverModalClosed}
          listDrivers={driverRegisterModalClosed}
        />
        <ChooseCarModal
          isOpen={isOpenChooseCarModal}
          onClose={onCloseChooseCarModal}
          driverId={driverId}
        />
        <RegisterCarModal
          isOpen={isOpenTransportModal}
          onClose={onCloseTransportModal}
          listCar={listCarModalClosed}
        />
        <ListDeliveriesModal
          isOpen={isOpenListDeliveriesModal}
          onClose={nullifyModalType}
          onClick={listDeliveriesModalClosed}
          type={modalType}
        />
        <ListDeliveriesDetailModal
          isOpen={isOpenListDeliveriesDetailModal}
          onClose={onCloseListDeliveriesDetailModal}
          onClick={backToListDeliveriesModal}
          getCoord={closeListDeliveriesDetail}
          type={modalType}
          deliveryGroup={deliveryGroup}
        />

        <ListDriverModal
          isOpen={isOpenListDriverModal}
          onClose={onCloseListDriverModal}
          chooseCar={listDriverModalClosed}
        />
        <ListCarModal
          isOpen={isOpenListCarModal}
          onClose={onCloseListCarModal}
        />
      </ChakraProvider>
    </>
  );
}

export default ModalCard;
