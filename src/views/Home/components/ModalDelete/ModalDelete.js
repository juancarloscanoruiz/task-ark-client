import React from 'react';
import { Modal } from'antd';
import PropTypes from 'prop-types';
import { Button } from '../../../../components/Button';

const ModalDelete = ({ visible, onOk, onCancel, isLoading }) => {
    return (
        <Modal          
            visible={visible}
            closeIcon={false}
            onCancel={onCancel}
            onOk={onOk}
            footer={[
                <Button onClick={onCancel} type="default">
                    Cancelar
                </Button>,
                <Button onClick={onOk} loading={isLoading} type="primary">
                    Aceptar
                </Button>
            ]}
        >
            ¿Estás seguro que deseas eliminar esta tarea?
        </Modal>
    )
}

ModalDelete.propTypes = {
    visible: PropTypes.bool.isRequired,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
}

ModalDelete.defaultProps = {
    visible: false,
    onOk: () => {},
    onCancel: () => {},
    isLoading: false,
}

export default ModalDelete
