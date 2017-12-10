import React from 'react';

const App = React.createClass({
    render: () => {
        return(
            <div>
                { this.props.children }
                <hr/>
                <div>
                    <h5>
                        FOOTER: Тут обычно соц. иконки соц. сетей размещены
                    </h5>
                </div>
            </div>
        )
    }
});

export default App;