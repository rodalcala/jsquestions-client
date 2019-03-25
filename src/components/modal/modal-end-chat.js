import React, { Component } from 'react';
import '../log-in/log-in.scss';
import { Link } from "react-router-dom";

class ModalEndChat extends Component {
  state = {
    feedback: 0,
    // questionid: this.props.modalRef.questionid,
    // expiration: Date.now() + 30
  }

  closesQuestion = () => {
    const token = localStorage.getItem('token');
    const body = {
      "karma": this.state.feedback,
      "credits": 50
    }

    fetch(`http://localhost:4000/questions/${this.props.questionId}/feedback`, {
      method: 'PUT', 
      headers: { 
        'Authorization' : 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => this.props.updateKarma(this.state.feedback));
  }

  chatFeedback = (e) => {
    e.preventDefault();
    // this.props.sendOffer(this.state) //Amber TTD: put feedback in here
    this.props.closeChatModal()
    
    if (this.props.tutorOrLearner === 'tutor'){
      this.props.history.push('/answer');
    } else {
      this.closesQuestion();
      this.props.history.push('/my-questions');
    }

  }

  setFeedback = (e, num) => {
    e.preventDefault();
    this.setState({feedback: num})
  }

  render() {
    if (this.props.tutorOrLearner === 'tutor') {
      return (
        <div className="backdrop">
          <div className="modal">
            <button onClick={()=>this.props.closeChatModal()}>X</button>
            <div>Thanks for being a tutor</div>
            <div>Keep on being awesome, We love you.</div>
            <form>
              <button onClick={(e)=> this.chatFeedback(e)}>SUBMIT</button>
            </form>
          </div>
        </div>
      )
    } else {
      return (
        <div className="backdrop">
          <div className="modal">
            <button onClick={()=>this.props.closeChatModal()}>X</button>
            <div>Hope your Tutor solved your question</div>
            <div>Feel free to ask more questions or heck help out others if you feel confident!</div>
            <div>Please vote below on how you feel your Tutor did, Karma helps Tutors differencate themselves apart from others.</div>
            <form>
              <button onClick={(e) => this.setFeedback(e, 0)}>0 karma</button>
              <button onClick={(e) => this.setFeedback(e, 1)}>1 karma</button>
              <button onClick={(e) => this.setFeedback(e, 3)}>3 karma</button>
              <button onClick={(e)=> this.chatFeedback(e)}>SUBMIT</button>
            </form>
          </div>
        </div>
      )
    }
    
  }
}

export default ModalEndChat;