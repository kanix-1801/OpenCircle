import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };
  return (
    <nav>
      <div className="container head">
        <img
          onClick={() => {
            window.location.reload();
          }}
          className="logo-photo brand-logo"
          src="https://gateway.pinata.cloud/ipfs/QmUcsrvmaMuXrpoioWCUXF4SsvRRdJmrwmUc1fiJdfbJM3"
          alt="Brand Logo"
          onMouseOver={handleHover}
          onMouseLeave={handleLeave}
          style={{
            cursor: hovered ? "pointer" : null,
          }}
        />
        <div className="create">
          <div className="connect-button">
            <ConnectButton
              showBalance={false}
              // chainStatus="icon"
              // accountStatus="avatar"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
