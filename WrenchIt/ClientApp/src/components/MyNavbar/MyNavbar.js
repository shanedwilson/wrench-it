import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import machineRequests from '../../helpers/data/machineRequests';
import serviceRequests from '../../helpers/data/serviceRequests';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  navMounted = false;

  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
    currentUser: PropTypes.object,
  }

  state = {
    isOpen: false,
    alertServices: [],
    machines: [],
    services: [],
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  alertFlash = () => {
    const {alertServices} = this.state;
    const element = document.getElementById("alerts");

    if(alertServices.length > 0){
        element.classList.add("alert-div");
    }
  }

  checkDates = (serviceDate) => {
    const x = 3;
    const currentDate = new Date();
    const checkedDate = new Date(serviceDate.setMonth(serviceDate.getMonth() + x));
    if(currentDate >= checkedDate){
        return true;
    } else {
        return false;
    }
  };

  makeAlertServices = () => {
    let alertServices = [];
    const services = [...this.state.services];
    services.forEach(s => {
        let dateChecked = this.checkDates(new Date(s.ServiceDate));
        if(dateChecked){
            alertServices.push(s);
        }
        this.setState({ alertServices });
        this.alertFlash();
    })
  }

  getAllServicesByOwnerId = () => {
    const { currentUser } = this.props;
    const ownerId = currentUser.id;
    serviceRequests.getAllServicesByOwnerId(ownerId)
        .then((services) => {
            this.setState({ services });
            this.makeAlertServices();
        });
  }

  getAllMachinesById = (id) => {
    machineRequests.getAllMachinesById(id)
      .then((machinesObject) => {
        this.setState({ machines: machinesObject })
        this.getAllServicesByOwnerId(id);
      });
    }

  componentWillReceiveProps(props){
    this.navMounted = !!props.currentUser.id;
    if (this.navMounted) {
        this.getAllMachinesById(props.currentUser.id);
    }
  }

  render() {
    const { isAuthed, logoutClickEvent, currentUser } = this.props;
    const noUser = Object.keys(currentUser).length === 0 && currentUser.constructor === Object;

    const buildNavbar = () => {
      if (isAuthed && !noUser) {
        return (
        <Nav className="ml-auto" navbar>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/home">Home</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/profile">Profile</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/myGarage">My Garage</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/links">Links</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink id="alerts" tag={RRNavLink} to="/alerts">Alerts</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink onClick={logoutClickEvent}>Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      if (isAuthed && noUser) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem className="nav-item">
              <NavLink onClick={logoutClickEvent}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      if (!isAuthed) {
        return (
          <Nav className="ml-auto" navbar></Nav>
        );
      }
    };

    return (
      <div className="my-navbar mb-5">
       <Navbar dark expand="md" className="my-navbar" fixed={'top'}>
          <NavbarBrand href="/">Wrench It</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
           {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
