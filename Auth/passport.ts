import passport from 'passport';
import passJwt from 'passport-jwt';
const ExtractJwt = passJwt.ExtractJwt;
const JwtStrategy = passJwt.Strategy;
import { getUser } from '../routers/temp.service';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"secret"
}

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    // get user from database
    const user = getUser();

    if (user) {
        console.log("OK")
        return done(null, user);
    } else {
        console.log("NOT OK")
        return done(null, false);
    }
});

passport.use(jwtLogin);

