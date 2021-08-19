import moment from 'moment';

export const getDeadLine = (minutes, seconds) => {
    return moment().add(minutes, "minutes").add(seconds, "seconds");
}