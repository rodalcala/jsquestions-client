import React from 'react';
import '../log-in/log-in.scss';
import './modal.scss';
import { useSpring, animated } from 'react-spring';

const offerHelp = (e, modalInfo, props) => {
  e.preventDefault();
  props.sendOffer(modalInfo)
  props.closeOfferModal()
}

function ModalOfferHelp(props) {
  const [modalInfo, setModalInfo ] = React.useState({
    message: null,
    questionid: props.modalRef.questionid,
    expiration: 0,
  })

  const backdropAnimation = useSpring({ reverse: !props.showModal, from: {display: 'none'}, to: {display: 'block'}, delay: (_) => !props.showModal ? 500 : 0 })
  const props2 = useSpring({ reverse: !props.showModal, to: {opacity: 1, width: '600px', height: '600px'}, from: {opacity: 0, width: '0px', height: '0px'}, config: {duration:500}})
  const props3 = useSpring({ opacity: 1, from: {opacity: 0}, config: {duration:3000}})
  const props4 = useSpring({ opacity: 1, from: {opacity: 0}, config: {duration:4000}})

  return (
    <animated.div style={backdropAnimation}>
    <div className="backdrop">
      <animated.div style={props2}>
      <div className="modal">
        <animated.div style={props3}>
        <button onClick={()=>props.closeOfferModal()}>X</button>
        <div>{props.modalRef.title}</div>
        <div>{props.modalRef.description}</div>
        <form>
          <input type='text' placeholder='Explain how you can help' onChange={(event) => setModalInfo({...modalInfo, questionid: props.modalRef.questionid, message: event.target.value})} />
          <input type='number' placeholder='Numbers only please' onChange={(event) => setModalInfo({...modalInfo, questionid: props.modalRef.questionid, expiration: +event.target.value})} />
          <animated.div style={props4}>
          <button onClick={(e)=> offerHelp(e, modalInfo, props)}>{props.modalRef.button}</button>
          </animated.div>
        </form>
        </animated.div>
      </div>
      </animated.div>
    </div>
    </animated.div>
  )
}

export default ModalOfferHelp;