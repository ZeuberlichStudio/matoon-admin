import React from 'react';
import ReactDOM from 'react-dom';

const modalStyles = {
    width: '100vw',
    height: '100vh',
    left: 0,
    top: 0,
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
    zIndex: '999'
}

const dialogStyles = {
    width: '200px',
    height: '200px',
    backgroundColor: 'white'
}

export const ModalContext = React.createContext({
    modals: {},
    addModal: () => null,
    showModal: () => null,
    hideModal: () => null
});

export function useModal() {
    const [modals, setModals] = React.useState({});

    function addModal(name, show = false) {
        if ( typeof modals[name] == 'undefined' ) setModals({...modals, [name]: show});
        else console.warn(`Modal named "${name}" was alredy registered!`);
    }

    function showModal(name) {
        console.log('showing', modals);
        if ( modals[name] != 'undefined' ) setModals({...modals, [name]: true});
        else console.warn(`No modal named "${name}" was registered!`);
    }

    function hideModal(name) {
        if ( modals[name] != 'undefined' ) setModals({...modals, [name]: false});
        else console.warn(`No modal named "${name}" was registered!`);
    }

    return {
        modals,
        addModal,
        showModal,
        hideModal
    };
}

export function Modal({ children, name }) {
    const dialogRef = React.useRef();
    const { modals, addModal, hideModal } = React.useContext(ModalContext);

    React.useEffect(function() {
        addModal(name);
    }, [name]);

    function outsideClickHandler(e) {
        if ( dialogRef.current.contains(e.target) ) return;
        hideModal(name);
    }

    React.useEffect(() => {
        if ( !modals[name] || !dialogRef.current ) return;

        window.addEventListener('mousedown', outsideClickHandler);

        return () => {
            window.removeEventListener('mousedown', outsideClickHandler);
        }
    }, [modals, dialogRef.current]);

    return modals[name] ? ReactDOM.createPortal(
        <div style={modalStyles} className="modal">
            <div ref={dialogRef} style={dialogStyles} className="modal_dialog">
                { Array.isArray(children) ? children : [children] }
            </div>
        </div>, document.body
    ) : null;
}