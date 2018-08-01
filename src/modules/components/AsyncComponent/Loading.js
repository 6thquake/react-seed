import React, {Component} from 'react';

const Loading = (props) => {
    const { isLoading, error } = props;

    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        console.log(error);
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

export default Loading;