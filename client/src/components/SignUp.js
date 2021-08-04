import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
      name: '',
      email: '',
      password: '',
    });
    const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

    return ();
  };
  
  export default Signup;