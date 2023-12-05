import React from 'react';

class CardEditor extends React.Component {
    render(){
        const cards = this.props.cards.map(card =>{
            return (
                <tr>
                    <td>card front</td>
                    <td>card back</td>
                    <td>
                        <button>Delete card</button>
                    </td>
                </tr>
            )
        })
        return(
            <div>
                <h2>Card Editor</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default CardEditor; 