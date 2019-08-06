import React from 'react';
import PropTypes from 'prop-types';

class ServicePartsTable extends React.Component {
    static propTypes = {
      selectedParts: PropTypes.array,
      isDetail: PropTypes.bool,
      isEditing: PropTypes.bool,
      removePartEvent: PropTypes.func,
    }

    render() {
      const {
        selectedParts, isDetail, isEditing, removePartEvent,
      } = this.props;

      const createServiceParts = () => {
        if (isDetail && !isEditing) {
          return (
            selectedParts.map(sp => (
                    <tr id={sp.id} key={sp.id} className="">
                        <td className="part-brand">{sp.brand}</td>
                        <td className="part-model">{sp.partNumber}</td>
                    </tr>
            ))
          );
        }
        return (
          selectedParts.map((sp, i) => (
                <tr id={sp.id} key={sp.id} className="">
                    <td className="part-brand">{sp.brand}</td>
                    <td className="part-model">{sp.partNumber}</td>
                    <td onClick={removePartEvent} title="Delete Part" id={sp.id}>
                        <i className="delete-btn fas fa-trash"></i>
                    </td>
                </tr>
          ))
        );
      };

      return (
            <div className="table-div mx-auto">
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">Brand</th>
                        <th scope="col">Part</th>
                    </tr>
                </thead>
                <tbody>
                    {createServiceParts()}
                </tbody>
            </table>
        </div>
      );
    }
}

export default ServicePartsTable;
