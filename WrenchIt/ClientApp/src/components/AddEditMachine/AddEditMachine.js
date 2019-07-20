import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';
  import PropTypes from 'prop-types';

  class AddEditMachine extends React.Component{
    toggleEvent = () => {
        const { toggleMachineModal } = this.props;
        toggleMachineModal();
      }

      render(){
          const { modal } = this.props;

          return(
            <Modal isOpen={modal} className="modal-lg">
            <ModalHeader class-name="modal-header" toggle={this.toggleEvent}>Add/Edit Machine</ModalHeader>
            <ModalBody className="text-center modal-body" id="machine-modal">
              <div className="border border-dark rounded">
                <h3>Add/Edit Machine</h3>
                <ModalFooter className="modal-footer">
                  <button onClick={this.toggleEvent} className="bttn-pill bttn-md bttn-danger mb-3">
                      Go Back
                  </button>
                </ModalFooter>
              </div>
            </ModalBody>
          </Modal>          )
      }
  }

  export default AddEditMachine