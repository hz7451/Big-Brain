import React from 'react';

const ImageLinkForm = ({onInputChange, OnButtonSubmit}) => {
    return (
        <div>
            <p className={'f3'}>
                {'This is a facial recognition. It might not work due to api server.'}
            </p>
            <div className='center'>
                <div className='.bg center pa4 br3 shadow-5  '>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib b--black-1 .br4 light-sliver' onClick={OnButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;  