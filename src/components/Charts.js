import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';


class Charts extends Component {

    render() { 

        // const radardata = {
        //     labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        //     datasets: [
        //       {
        //         label: 'My First dataset',
        //         backgroundColor: 'rgba(179,181,198,0.2)',
        //         borderColor: 'rgba(179,181,198,1)',
        //         pointBackgroundColor: 'rgba(179,181,198,1)',
        //         pointBorderColor: '#fff',
        //         pointHoverBackgroundColor: '#fff',
        //         pointHoverBorderColor: 'rgba(179,181,198,1)',
        //         data: [65, 59, 90, 81, 56, 55, 40]
        //       },
        //     ]
        //   };
    
        const reactchartdata = {
            labels: [
                'Cantidad total de Tweets',
                'Cantidad de tweets en donde se menciono la keyword',
               
            ],
            datasets: [{
                data: [window.total, window.mentions],  //<----quisiera que en este parametro/clave/key estuviese la variable del componente Tweetlist
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

            

        return (
            <Pie data={reactchartdata} />
            // <Radar data={radardata}/>
          );
    }
}
 
export default Charts;