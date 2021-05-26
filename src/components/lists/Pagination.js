import React from 'react';
import { Pagination } from 'react-admin';

export default props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;
