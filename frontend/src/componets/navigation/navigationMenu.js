import HomeIcon from "@mui/icons-material/Home"
import ExploreIcon from "@mui/icons-material/Explore"
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const navigationMenue=[
    {
        tittle:"Home",
        icon:<HomeIcon/>,
        path:"/home"
    },
    {
        tittle:"Explore",
        icon:<ExploreIcon/>,
        path:""
    },
    {
        tittle:"Notification",
        icon:<NotificationsIcon/>,
        path:"/home"
    },
    {
        tittle:"Message",
        icon:<MessageIcon/>,
        path:"/home"
    },
    {
        tittle:"List All",
        icon:<ListAltIcon/>,
        path:"/home"
    },
    {
        tittle:"Groups",
        icon:<GroupIcon/>,
        path:"/home"
    },
    {
        tittle:"Progress",
        icon:<TrendingUpIcon/>,
        path:"/progress"
    },
    {
        tittle:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/home"
    }
]