import React from "react";
import Navbar, { NavbarProps } from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import { NavDropdown } from "react-bootstrap";

export type IMenuItem = {
  caption: string;
  link?: string;
  children?: IMenuItem[];
};

export type INavMenuProps = {
  siteName: string;
  fluid?: string | boolean;
  menu?: IMenuItem[];
  text?: React.ReactNode;
};

export type INavMenuItemProps = {
  menuItem: IMenuItem;
};


const NavItem: React.FC<INavMenuItemProps> = ({ menuItem }) => {
  if (menuItem.children) {
    return (
      <NavDropdown title={menuItem.caption}>
        {menuItem.children.map((c, key) => (
          <NavDropdown.Item
            key={`${c.caption}-${c.link}-${key}`}
            href={c.link}
            as={Link}
            style={{ padding: "10px" }}
          >
            {c.caption}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  } else {
    return (
      <Nav.Item>
        <Nav.Link href={menuItem.link} as={Link} legacyBehavior={false}>
          {menuItem.caption}
        </Nav.Link>
      </Nav.Item>
    );
  }
};

export type NavMenuProps = NavbarProps & INavMenuProps;

export const NavMenu: React.FC<NavMenuProps> = ({
  siteName,
  fluid,
  menu,
  text,
  ...navBarProp
}) => {
  return (
    <Navbar {...navBarProp}>
      <Container fluid={fluid}>
        <Navbar.Brand href="/" as={Link} legacyBehavior={false}>
          {siteName}
        </Navbar.Brand>
        <Navbar.Toggle />
        {menu && (
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              {menu.map((menuItem, key) => {
                return (
                  <NavItem
                    menuItem={menuItem}
                    key={`${menuItem.caption}-${menuItem.link}-${key}`}
                  />
                );
              })}
            </Nav>
            {text && <Navbar.Text>{text}</Navbar.Text>}
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
