import React, { Component } from 'react'
import request from 'superagent'
import './favorites.css'

export default class Favorites extends Component {
    state = {
        faves: []
    }


    componentDidMount = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        const faves = await request.get(`https://guarded-lake-55222.herokuapp.com/api/me/favorites`).set('Authorization', user.token);

        this.setState({ faves: faves.body })
    }

    handleDelete = async (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        await request.delete(`https://guarded-lake-55222.herokuapp.com/api/me/favorites/${id}`).set('Authorization', user.token);
        const faves = await request.get(`https://guarded-lake-55222.herokuapp.com/api/me/favorites`).set('Authorization', user.token);
        this.setState({ faves: faves.body })

    }



    render() {

        return (
            <div>
            {/* <h1 id="events">YOUR EVENTS</h1> */}
                
            <div className="faves-container">
                {
                    this.state.faves.map(fave =>
                        <div className="fave-card-div">
                            {/* <p>{fave.date}</p> */}
                            <img id="disasterimg" src='Disaster Icon.svg' alt="disaster icon" />
                            <h3 id="disastertitle">{fave.title}</h3>
                            <button onClick={() => this.handleDelete(fave.id)}>Remove Event</button>
                        </div>

                    )
                }

                {/* <h4> {this.state.faves.title} </h4> */}
                <p></p>

            </div>
            </div>
        )
    }
}
