import {observable} from 'mobx'
import { createContext } from 'react';
class ActivityStore{
@observable title="Helloe form mobx";

}
export default createContext(new ActivityStore());