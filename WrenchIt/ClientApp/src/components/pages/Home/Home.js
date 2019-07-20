import React from 'react';
import AddEditMachine from '../../AddEditMachine/AddEditMachine';

class Home extends React.Component{
    state = {
        modal: false,
    }

    changeView = (e) => {
        const view = e.currentTarget.id;
        this.props.history.push(`/${view}`);
      }

    toggleMachineModal = () => {
        const { modal } = this.state;

        this.setState({ modal: !modal });
    }

    render(){
        const { modal } = this.state;

        return(
            <div className="home justify-content:center">
                <div className="card-columns homeWrapper mt-5">
                    <div className="card mt-3 border-dark animated zoomIn" id="myGarage" onClick={this.changeView}>
                        <div className="card-body home text-center">
                        <h4 className="card-title"><i className="fas fa-6x fa-car"></i></h4>
                        <h5 className="card-subtitle mb-2 text-muted">My Garage</h5>
                        </div>
                    </div>
                    <div className="card mt-3 border-dark animated zoomIn" id='addMacine' onClick={this.toggleMachineModal}>
                        <div className="card-body home text-center">
                        <h4 className="card-title"><i className="fas fa-plus-circle fa-6x"></i></h4>
                        <h5 className="card-subtitle mb-2 text-muted">Add Machine</h5>
                        </div>
                    </div>
                    <div className="card mt-3 border-dark animated zoomIn" id='links' onClick={this.changeView}>
                        <div className="card-body home text-center">
                        <h4 className="card-title"><i className="fas fa-6x fa-tools"></i></h4>
                        <h5 className="card-subtitle mb-2 text-muted">DIY Links</h5>
                        </div>
                    </div>
                    <div className="card mt-3 border-dark animated zoomIn" id='alerts' onClick={this.changeView}>
                        <div className="card-body home text-center">
                        <h4 className="card-title"><i className="fas fa-6x fa-exclamation-triangle"></i></h4>
                        <h5 className="card-subtitle mb-2 text-muted">Alerts</h5>
                        </div>
                    </div>
                </div>
                <AddEditMachine
                    toggleMachineModal = {this.toggleMachineModal}
                    modal = {modal}
                />
            </div>
        )
    }
}

export default Home;
