import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NameField from './Components/NameField.jsx';
import Notibar from './Components/Notibar.jsx';

class AddQueueApplication extends React.Component {
   constructor(){
       super();
       firebase.auth().signInWithEmailAndPassword( "57090016@queueic.com", "89977474").catch(function(error) {
            console.log("error wa : " + error);
        });

        this.state = {
            curRegisID : "",
            curRegisName : ""
        }
        this.writeUserData = this.writeUserData.bind(this);
        this.addQueueHandler = this.addQueueHandler.bind(this);
        
   }

   
   addQueueHandler(id,name, queue, nickname, facebook, phonenum){
       this.setState( { curRegisID : id , curRegisName : name , currentQueue :queue});
       console.log("action up completed");
       this.writeUserData(id,name,queue, nickname, facebook, phonenum);
       this.refs.noti.handleTouchTap();
       
   }

   writeUserData(stuName, stuId, stuQueue, nickname,facebook,phonenum) {
       var nQueue = stuQueue + 1;
        firebase.database().ref('queueList/' + stuId).set({
            id: stuId,
            name: stuName,
            queueNumber : nQueue
        });

        firebase.database().ref('studentInfo/' + stuName).set({
            ID: stuId,
            NAME: stuName,
            NICKNAME : nickname,
            FACEBOOK : facebook,
            PHONENUM : phonenum
        });

        console.log("writed");
    }

    

   render() {
      return (
        <div>
        <MuiThemeProvider>
            <NameField onSubmit = {this.addQueueHandler}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <Notibar text = { "Subscibe Completed... Your queue has been added" } ref = "noti"/>
        </MuiThemeProvider>
        </div>
      );
   }
}

export default AddQueueApplication;