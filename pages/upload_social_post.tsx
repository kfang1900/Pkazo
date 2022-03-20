import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from 'utils/useAuth';
import styles from '../styles/Home.module.css';
import SocialPostUploadForm from '../components/uploading/SocialPostUploadForm';

const UploadSocialPostPage: NextPage = () => {
  const auth = useAuth();
  return <SocialPostUploadForm></SocialPostUploadForm>;
};

export default UploadSocialPostPage;
