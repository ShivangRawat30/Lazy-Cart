import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  // ProtectedRoute already guards this page; wait until the user object is hydrated.
  if (loading || !user || !user.name) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Profile`} />
      <div className="profilePage">
        <div className="profileCard">
          <div className="profileCover" />

          <div className="profileAvatarWrap">
            <img
              className="profileAvatar"
              src={user.avatar?.url || '/Profile.png'}
              alt={user.name}
            />
          </div>

          <h1 className="profileName">{user.name}</h1>
          <p className="profileEmail">{user.email}</p>

          <Link to="/me/update" className="profileEditBtn">
            Edit Profile
          </Link>

          <div className="profileInfoGrid">
            <div className="profileInfoItem">
              <span className="profileInfoLabel">Full Name</span>
              <span className="profileInfoValue">{user.name}</span>
            </div>
            <div className="profileInfoItem">
              <span className="profileInfoLabel">Email</span>
              <span className="profileInfoValue">{user.email}</span>
            </div>
            <div className="profileInfoItem">
              <span className="profileInfoLabel">Joined On</span>
              <span className="profileInfoValue">
                {String(user.createdAt).substr(0, 10)}
              </span>
            </div>
          </div>

          <div className="profileActions">
            <Link to="/orders" className="profileActionBtn">
              My Orders
            </Link>
            <Link to="/password/update" className="profileActionBtn outline">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
