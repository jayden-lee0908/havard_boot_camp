import React from 'react';

class CardEditor extends React.Component {
    render(){
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