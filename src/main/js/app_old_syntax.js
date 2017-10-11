var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
var MyPage = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      userid: '',
      useridroom: '',
      url:'',
      done: true
    };
    
  },
  componentDidMount() {
    console.log("Hello_Go");
  },
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>ยกเลิกการจองห้อง</div>
      </Ons.Toolbar>
    );
  },
  handleClick: function() { 
    var name = this.state.username
    var name2 = this.state.userid
    var name3 = this.state.useridroom
    var that = this;
    let cnt=0;
    let len=" ";
    let {done } = this.state
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
      // len =  data._embedded.cutRooms.length;
      data._embedded.cutRooms.map((d,idx)=>{
        if(d.userid==name2&&d.useridroom==name3){
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
        ons.notification.alert(name + '<br>' + name2 +'<br>'+ name3);
      }else if(len==" "){
        ons.notification.alert("Don't have data user room id ");
      }
    })
  },
  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  },
  handleUsernameChange2(e) {
    this.setState({userid: e.target.value});
  },
  handleUsernameChange3(e) {
    this.setState({useridroom: e.target.value});
  },
    render: function() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
      {this.componentDidMount}
        <section style={{textAlign: 'center'}}>
          
          <p>
            <Ons.Input
              value={this.state.username}
              onChange={this.handleUsernameChange}
              modifier='underbar'
              float
              placeholder='ชื่อ-สกุล' />
          </p>
          <p>
            <Ons.Input
              value={this.state.userid}
              onChange={this.handleUsernameChange2}
              modifier='underbar'
              float
              placeholder='รหัสสมาชิก' />
          </p>
          <p>
            <Ons.Input
              value={this.state.useridroom}
              onChange={this.handleUsernameChange3}
              modifier='underbar'
              float
              placeholder='กรอกเลขที่ใบบันทึกการจอง' />
          </p>
          <p>
            <Ons.Button onClick={this.handleClick}>ยืนยัน</Ons.Button>
          </p>
        </section>
      </Ons.Page>
    );
  }
});
ReactDOM.render(<MyPage />, document.getElementById('react'));