import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import socketIOClient from "socket.io-client";
import CardComponent from './CardComponent';
import Charts from './Charts';

// import MyCloud from './MyCloud';
// import { Pie } from 'react-chartjs-2';


class TweetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], 
      searchTerm: "", 
      showLoading: false,
      location: [],
      showChart: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

 
    
    componentDidMount() {
      const socket = socketIOClient('http://localhost:3000/');
      
      socket.on('connect', () => {
        console.log("Socket Connected");
        socket.on("tweets", data => {
          console.info(data);
          let searchterm = data.text
          window.dataText = data.text
          window.radarLocation = data.user.location
          
          // console.log(window.radarLocation);
          // console.log(searchterm)
          let newList = [data].concat(this.state.items);
            if (searchterm.includes(this.state.searchTerm)){
             window.mentions = this.state.items.length
            }
          // console.log(newList.length)
          // console.log(count)
          this.setState({ items: newList });
        

        });
      });
      socket.on('disconnect', () => {
        socket.off("tweets")
        socket.removeAllListeners("tweets");
        console.log("Socket Disconnected");
      });
    }
    
    
  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {

      this.handleResume();
    }
  }

  handleResume() {
   
    this.setState({showLoading: true})
    this.setState({showChart: true})
    let term = this.state.searchTerm;
    fetch("/setSearchTerm",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ term })
      })
      
      
    }
    
    handlePause(event) {
      this.setState({showLoading:false})
      fetch("/pause",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    
    render() {
      let items = this.state.items.slice(0, 15);
      let itemsCards = <CSSTransitionGroup
      transitionName="example"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
      {items.map((x, i) =>
        <CardComponent key={i} data={x} />
        )}


    </CSSTransitionGroup>;
      window.total = this.state.items.length
    
      
      
    let searchControls =
      <div>
        <input id="email" type="text" className="validate" value={this.state.searchTerm} onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
        <label htmlFor="email">Search</label>
      </div>



    let filterControls = <div>
      <a className="btn-floating btn-small waves-effect waves-light pink accent-2" style={controlStyle} onClick={this.handleResume}><i className="material-icons">play_arrow</i></a>
      <a className="btn-floating btn-small waves-effect waves-light pink accent-2" onClick={this.handlePause} ><i className="material-icons">pause</i></a>
      <p>
        <input type="checkbox" id="test5" />
        <label htmlFor="test5">Retweets</label>
        <h1>{window.total}</h1>
      </p>
      <div className="Chartcomponent" >
          {/* <MyCloud></MyCloud> */}
          {/* <Charts></Charts> */}
          <p>{window.radarLocation}</p>
          
          {this.state.showChart ? <Charts></Charts>: null}
          {/* {window.radarLocation.map((location) =>{
            <DoughnutChart data={location}></DoughnutChart>
          })}
           */}
          {/* {total.map((x, i) =>
            <Charts label={i} data={x}/>
          )} */}
        </div>
    </div>


    // let controls = <div>
    //   {
    //     items.length > 0 ? filterControls : null
    //   }
    // </div>

          let loading = <div>
            <p className="flow-text">Cargando Tweets en Real-Time</p>
            <div className="progress lime lighten-3">
              <div className="indeterminate pink accent-1"></div>
            </div>
          </div>
    // let loadingInterval = setInterval(timer, 3000);

    

    return (
      <div className="row">
        <div className="col s12 m4 l4">
          <div className="input-field col s12">
            {searchControls}
            {filterControls}
            {
              // items.length > 0 ? controls : null
            }
          </div>
        </div>
        <div className="col s12 m4 l4">
          <div>
            
            {/* {items.length > 0 ? loading : "no se pudo cargar"} */}
            {this.state.showLoading ? loading: null}
            {this.state.showLoading ? null: "tweets pausados"}
            {this.handleResume ? itemsCards : "Error al cargar tweets"}
            
            {/* {this.handlePause ? loading === null: "nada" } */}

          </div>

        </div>
        <div className="col s12 m4 l4">
        </div>
      </div>
    );
  }
}

const controlStyle = {
  marginRight: "5px"
};


export default TweetList;