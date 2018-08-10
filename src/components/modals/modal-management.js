import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal';

import ProjectModal from './projectModal';

import {fetchUsers} from '../../actions/userActions'

const mapStateToProps = state => {
  console.log('MM');
    return ({
        modalProps: state.modalReducer.modalProps
    });
}

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        modalIsOpen: nextProps.modalProps.open
      })
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    
    return (
      <div>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
  
          bodyOpenClassName="modal-open"
          className="modal-dialog modal-dialog-centered"
        >

         <ProjectModal   closeModal = {this.closeModal} {... this.props.modalProps}> </ProjectModal>
        </ReactModal>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(ModalContainer)