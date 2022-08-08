import React from 'react';

const ValidateWrapper = ({children, error, className}) => (
    <div className={`validate-wrapper ${error ? 'validate-wrapper_error' : ''}`}>
        {children}
        {error &&
            <div className={`validate-error ${className ?? ''}`}>
                {error?.message}
            </div>
        }
    </div>
)

export default ValidateWrapper