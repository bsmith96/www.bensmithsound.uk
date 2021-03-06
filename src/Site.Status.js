import React from 'react';
import './App.css';
import './Site.Status.css';
import {prods} from './Production.list.json';

const today = new Date();

class Status extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {prods};
  }

  setGreeting() {
    var greetingOptions = [
      "Hi there!",
      "Hello!"
    ]

    //const now = new Date();
    var greeting = ""
    var pickGreeting = ""

    if(today.getHours() < 12) {
      greeting = "Good morning!"
    } else if(today.getHours() < 18 && today.getHours() >= 12) {
      greeting = "Good afternoon!"
    } else if(today.getHours() < 23 && today.getHours() >= 18) {
      greeting = "Good evening!"
    };

    if(greeting) {
      greetingOptions.push(greeting);
      pickGreeting = greetingOptions[Math.floor(Math.random()*greetingOptions.length)];
      return pickGreeting;
    } else {
      pickGreeting = greetingOptions[Math.floor(Math.random()*greetingOptions.length)];
      return pickGreeting;
    };
  }

  setStatus() {
    var prodStatus = false;
    var status = "";

    prods.map(prod => {
      var preStart = new Date(Date.parse(prod.date.preStart));
      var fitupStart = new Date(Date.parse(prod.date.fitupStart));
      var techStart = new Date(Date.parse(prod.date.techStart));
      var runStart = new Date(Date.parse(prod.date.runStart));
      var runEnd = new Date(Date.parse(prod.date.runEnd + " 23:59:59"));

      /*if (prod.producer) {
        var showRef = prod.showName + " (for " + prod.producer + ")"
      } else {
        var showRef = prod.showName
      }*/

      var showRef = prod.showName;

      if(preStart <= today && fitupStart > today) {
        prodStatus = "in pre-production for <em>" + showRef + "</em>";
      } else if(fitupStart <= today && techStart > today) {
        prodStatus = "fitting up for <em>" + showRef + "</em>";
      } else if(techStart <= today && runStart > today) {
        prodStatus = "in tech rehearsals for <em>" + showRef + "</em>";
      } else if(runStart <= today && runEnd > today) {
        prodStatus = "working on performances of <em>" + showRef + "</em>";
      } else {
        prodStatus = false
      };

      if(runEnd >= today && runStart <= today) {
        prodStatus = "working on performances of <em>" + showRef + "</em>";
      } else if(runStart >= today && techStart <= today) {
        prodStatus = "in tech rehearsals for <em>" + showRef + "</em>";
      } else if(techStart >= today && fitupStart <= today) {
        prodStatus = "fitting up for <em>" + showRef + "</em>";
      } else if(fitupStart >= today && preStart <= today) {
        prodStatus = "in pre-production for <em>" + showRef + "</em>";
      }

      if(prodStatus) {
        if(status === "") {
          status = "I am currently " + prodStatus;
        } else {
          status = status.replace(", and ", ", ");
          status = status.concat(", and " + prodStatus);
        }
      };

      return(status);

    })

    return(status + ".");
  }

  getDate() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    const todayYear = today.getFullYear();
    const todayMonth = months[today.getMonth()];
    const todayDate = today.getDate();
    const todayDay = days[today.getDay()];

    return todayDay + ", " + todayDate + " " + todayMonth + " " + todayYear;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          {this.setStatus() !== "." &&
            <div className="col-md-6 mt-2">
                <p className="text-end mb-1"><span className="badge bg-secondary status-date">{this.getDate()}</span></p>
              <div className="alert alert-primary">
                <strong>{this.setGreeting()}</strong> <text dangerouslySetInnerHTML={{__html: this.setStatus() }}></text>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}


/*  F L O A T I N G  */

/*<div className="position-fixed top-0 end-0 p-3 status" style={{zIndex:'5'}}>
  {this.setStatus() !== "." &&
  <div id="liveToast" className="toast fade-in-and-out" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-body">
      <strong>{this.setGreeting()}</strong> <text dangerouslySetInnerHTML={{__html:this.setStatus()}}></text>
    </div>
  </div>
  }
</div>*/


/*  A L E R T  */

/*      <div className="container-fluid">
        <div className="row justify-content-center">
          {this.setStatus() !== "." &&
            <div className="col-md-6 mt-4">
              <p className="text-end"><span className="badge bg-secondary">{this.getDate()}</span></p>
              <div className="alert alert-primary fade show" role="alert">
                <strong>{this.setGreeting()}</strong> <text dangerouslySetInnerHTML={{__html: this.setStatus() }}></text>
              </div>
            </div>
          }
        </div>
      </div>*/

export default Status;