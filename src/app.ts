import express from 'express';

import passport from './config/passport';
import routes from './routes';

import { logger, morgan } from './middlewares/logger';
import {
  corsOptions,
  limiter,
  helmet,
  compression,
  cookieParser,
  cors,
} from './middlewares/security';

const app = express();

// Apply Middlewares
app.use(morgan('dev'));
app.use(logger);
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

// JSON body parsing
app.use(express.json());

// Initialize passport
app.use(passport.initialize());

app.use('/', routes);

export default app;
