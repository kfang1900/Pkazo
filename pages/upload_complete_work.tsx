import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from 'utils/useAuth';
import styles from '../styles/Home.module.css';
import CompleteWorkUploadForm from '../components/uploading/CompleteWorkUploadForm.js';

const UploadCompleteWorkPage: NextPage = () => {
  return <CompleteWorkUploadForm></CompleteWorkUploadForm>;
};

export default UploadCompleteWorkPage;
