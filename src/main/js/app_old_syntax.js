var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
var index = 1;
var MyPage = React.createClass({
  getInitialState: function() {
    return {
      Name: '',
      NameId: '',
      RoomId:'',
       done: true
      
    };
  },
  renderToolbar: function(route, navigator) {
    
    const backButton = route.hasBackButton
      ? <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Back</Ons.BackButton>
      : null;
    return (
      <Ons.Toolbar>
        <div className='left'>{backButton}</div>
        <div className='center'>{route.title}</div>
      </Ons.Toolbar>
      
    );
   
  },
  handleClick: function(navigator) {
    ons.notification.confirm('Do you really want to go back?')
      .then((response) => {
        if (response === 1) {
          navigator.popPage();
          index--;
        }
      });
  },
  Cancel_OnClick(){
    const {Name,NameId,RoomId,done}= this.state
    var that = this;
    let cnt=0;
    let len=" ";
    var url = 'http://localhost:8080/api/cutRooms/'
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(data) {
      // that.setState({ person: data.person });   
      var data2 ={} 
      //console.log(name3)
      //len =  data._embedded.cutRooms.length;
      data._embedded.cutRooms.map((d,idx)=>{
        if(d.userid==NameId&&d.useridroom==RoomId){
          len = d._links.self.href
          fetch(d._links.self.href, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
             username: d.username,
              userid: d.userid,
              useridroom: " ",
            })
           }).then(()=>{
                that.setState({done:true})
           }) 
        }else{
              that.setState({done:false})
        }
    cnt++;
      });
      if(len!==" "){
        ons.notification.alert(Name + '<br>' + NameId +'<br>'+ RoomId);
      }else if(len==" "){
        ons.notification.alert("Don't have data user room id ");
      }
    })
  },
  handleNameChange(e) {
    this.setState({name: e.target.value});
  },
  handleNameIdChange(e) {
    this.setState({nameId: e.target.value});
  },
  handleRoomIdChange(e) {
    this.setState({RoomId: e.target.value});
  },

  pushPage: function(navigator) {
    navigator.pushPage({
      title: `ใบบันทึกการยกเลิกห้อง `,
      hasBackButton: true
    });
    if(index===2){
      index--;
    }
    index++;
  },

  renderPage: function(route, navigator) {
    if(index==1){
      return (
          <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
          <Ons.ListHeader>ชื่อ-สกุล : </Ons.ListHeader>
          <section style={{textAlign: 'center'}}>
            <p>
              <Ons.Input
                value={this.state.name}
                onChange={this.handleNameChange}
                modifier='underbar'
                float
                placeholder='ชื่อ-สกุล' />
            </p>
            </section>
          
          <Ons.ListHeader>รหัสสมาชิก: </Ons.ListHeader>
          <section style={{textAlign: 'center'}}>
            <p>
              <Ons.Input
                value={this.state.nameId}
                onChange={this.handleNameIdChange}
                modifier='underbar'
                float
                placeholder='รหัสสมาชิก' />
            </p>
            </section>
            
            <Ons.ListHeader>รหัสใบจองห้อง : </Ons.ListHeader>
            <section style={{textAlign: 'center'}}>
            <p>
              <Ons.Input
                value={this.state.roomId}
                onChange={this.handleRoomIdChange}
                modifier='underbar'
                float
                placeholder='รหัสใบจองห้อง' />
            </p>
            </section>
            
          <section style={{margin: '16px', textAlign: 'center'}}>
            <Ons.Button onClick={this.pushPage.bind(this, navigator)}>Next</Ons.Button>
          </section>
        </Ons.Page>
      );
      }else 
      var a = this.state.handleNameChange
      var b = this.state.handleNameIdChange
      var h = this.state.handleRoomIdChange
     return (
        <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
        <Ons.ListHeader>ชื่อ-สกุล {this.state.Name}:</Ons.ListHeader>
        <Ons.ListHeader>รหัสสมาชิก : {this.state.NameId}</Ons.ListHeader>
        <Ons.ListHeader>รหัสใบจองห้อง :{this.state.RoomId} </Ons.ListHeader>
          <section style={{margin: '16px', textAlign: 'center'}}>
            <Ons.Button onClick={this.Cancel_OnClick.bind(this)}>
              สำเร็จ
            </Ons.Button>
          </section>
        </Ons.Page>
      );

        return (
      <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
        <p style={{textAlign: 'center'}}>
        
       <p>
           <Ons.ListHeader>ชื่อ-สกุล : {a}</Ons.ListHeader>
        
           <Ons.ListHeader>รหัสสมาชิก :{b} </Ons.ListHeader>
           
           <Ons.ListHeader>รหัสใบจองห้อง : {h}</Ons.ListHeader>

          </p>
        
     
      </p>
     
      </Ons.Page>
      );
  },
handleNameChange(e) {
    this.setState({Name: e.target.value});
  },

  handleNameIdChange(e) {
    this.setState({NameId: e.target.value});
  },
  
  handleRoomIdChange(e) {
    this.setState({RoomId: e.target.value});
  },

  render: function() {
    return (
      <Ons.Navigator
        swipeable
        renderPage={this.renderPage}
        initialRoute={{
          title: 'ยกเลิกห้องซ้อมดนตรี',
          hasBackButton: false
        }}
      />
    );
  }
});
ReactDOM.render(<MyPage />, document.getElementById('react'));