import { Pie } from 'react-chartjs-2';
import React from 'react';

class CardComponent extends React.Component {
    render() {
        
        let data = this.props.data;
        let  location = data.user.location
        if (location === null){
            location = "no hay ubicacion"

        }
        // console.log(location)
        const chartdata = {
            labels: [
                'Cantidad de Tweets del Usuario',
                'Cantidad de veces que el usuario interactuo a otro Tweet',
               
            ],
            datasets: [{
                data: [data.user.statuses_count, data.user.favourites_count],
                backgroundColor: [
                '#FF6384',
                '#36A2EB'
               
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB'
                ]
            }]
        };
          

        // console.log(chartdata)
        return (
            
            <div>
                <div className="card-panel grey lighten-5 z-depth-3 hoverable thin">
                    <div className="row valign-wrapper">
                        <div className="col s2">
                            <img src={data.user.profile_image_url} alt={data.user.name} className="circle responsive-img" />
                        </div>
                        <div className="col s10 left-align">
                            <span className="black-text">{data.text}</span>
                        </div>
                        
                    </div>
                    <div className="row valign-wrapper right-align chip hoverable">
                    {new Date(data.created_at).toLocaleTimeString()}
                    </div>
                    <div className="row valign-wrapper right-align chip hoverable">
                    <span> Seguidores:{data.user.followers_count}</span>
                    </div>
                    <div className="row valign-wrapper right-align chip hoverable">
                    <span> Seguidos:{data.user.friends_count}</span>
                    </div>
                    <div className="row valign-wrapper right-align chip hoverable">
                    <span> Ubicacion:{location}</span>
                    </div>
                    <Pie data={chartdata} ></Pie>
                    <div className="row valign-wrapper right-align chip hoverable">
                        <a href={`https://twitter.com/${data.user.screen_name}`} target="_blank">{`@${data.user.screen_name}`}</a>
                    </div>
                </div>

            </div>
        );
    }
}


export default CardComponent;