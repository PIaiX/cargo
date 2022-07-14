import React from 'react';

const Loader = ({color}) => {
    const styles = {
        backgroundColor: color ?? '#FFF'
    }

    return (
        <div className="lds-ellipsis">
            <div style={styles}/>
            <div style={styles}/>
            <div style={styles}/>
            <div style={styles}/>
        </div>
    );
};

export default Loader;