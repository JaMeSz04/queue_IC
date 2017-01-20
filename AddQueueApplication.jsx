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
            curRegisName : "",
            size : 0,
            etmSize : 0
        }
        this.writeUserData = this.writeUserData.bind(this);
        this.addQueueHandler = this.addQueueHandler.bind(this);
        this.setSize = this.setSize.bind(this);
        this.setEtmSize = this.setEtmSize.bind(this);
        var currentRef = firebase.database().ref('/seSize/size');
        currentRef.on("value", this.setSize);
        var etmRef = firebase.database().ref('/etmSize/size');
        etmRef.on("value", this.setEtmSize);
   }

   
   addQueueHandler(id,name, queue, nickname, facebook, phonenum){
       this.setState( { curRegisID : id , curRegisName : name , currentQueue :queue });
       console.log("action up completed");
       this.writeUserData(id,name,queue, nickname, facebook, phonenum);
       this.refs.noti.handleTouchTap();
       
   }
   setSize(snapshot){

       this.setState({size : snapshot.val()});
   }
   setEtmSize(snapshot){
       console.log("set state  ETM " + snapshot.val());
       console.dir(snapshot.val().toString());
       this.setState({etmSize : snapshot.val()});
   }

   writeUserData(stuName, stuId, stuQueue, nickname,facebook,phonenum) {
       var nQueue = stuQueue + 1;
       var id = stuId.toString();
       if (id.substring(0,3) == "901" || id.substring(0,3) == "811"){
        console.log(this.state.size + 1);
        firebase.database().ref('seQueueList/' + stuId).set({
            id: stuId,
            name: stuName,
            queueNumber : (this.state.size + 1)
        });
        
        firebase.database().ref('seSize/').set({
            size : (this.state.size + 1)
        });
       }else{
           
          firebase.database().ref('etmQueueList/' + stuId).set({
            id: stuId,
            name: stuName,
          queueNumber : (this.state.etmSize + 1)
        });
        firebase.database().ref('etmSize/').set({
            size : (this.state.etmSize + 1)
        });
       }

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