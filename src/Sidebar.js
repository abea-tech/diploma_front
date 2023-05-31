import React, { useState } from "react";
import "./Sidebar.css";
// import SmallMenu from './SmallMenu';

import ModalCard from "./ModalCard";

import {
  ChakraProvider,
  extendTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function Sidebar({ onClick, getDelivery, updateMarkers }) {
  const [sidebarWidth, setSidebarWidth] = useState(60);
  const [isOpenBar, setIsOpenBar] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMenuClick = () => {
    if (isOpenBar) {
      setSidebarWidth(60);
    } else {
      setSidebarWidth(200);
    }
    setIsOpenBar(!isOpenBar);
  };

  return (
    <div className="sidebar" style={{ width: sidebarWidth, display: "block" }}>
      <div
        className={`hamburger ${isOpenBar ? "open" : ""}`}
        onClick={handleMenuClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`items ${isOpenBar ? "open" : ""}`}>
        <ModalCard
          onClick={onClick}
          getDelivery={getDelivery}
          updateMarkers={updateMarkers}
        />
      </div>
    </div>
  );
}

export default Sidebar;
