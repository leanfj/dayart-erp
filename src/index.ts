require('dotenv').config(
    {
        path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env'
    }
);

import './infrastructure/http/server'