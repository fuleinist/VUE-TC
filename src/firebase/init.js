import firebase from 'firebase/app'
import 'firebase/auth'

import FBCONFIG from '../../firebase.config'

// The configuration below is not sensitive data. You can serenely add your config here
const config = FBCONFIG

firebase.initializeApp(config)
