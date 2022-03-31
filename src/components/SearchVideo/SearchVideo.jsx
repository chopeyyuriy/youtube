import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Modal, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { FoundedVideo } from "./FoundedVideo";
import useGetingVideo from "../../hooks/useGetingVideo";
import useGetingChannel from "../../hooks/useGetingChannel";
import useGettingCategories from "../../hooks/categories/useGettingCategories";
import { useParams } from "react-router-dom";
import useAddVideo from "../../hooks/videos/useAddVideo";

export const SearchVideo = ({ visible, onClose }) => {
    const { categoryId } = useParams();
    const [searchInput, setSearchInput] = useState('');
    const [categorySelect, setCategotySelect] = useState(categoryId ?? 'default');
    const [searching, setSearching] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(false);
    const [existError, setExsistError] = useState(null);
    const [adding, setAdding] = useState(false);
    const { getVideo } = useGetingVideo();
    const { getChannel } = useGetingChannel();
    const { categories } = useGettingCategories();
    const { addVideo } = useAddVideo();

    const handleCleanResults = () => {
        setResult(null);
        setSearchInput('');
        setError(false);
        setExsistError(null);
    };

    const handleSearchVideo = async () => {
        const urlVideo = new URLSearchParams(searchInput);
        const params = Object.fromEntries(urlVideo?.entries());
        const videoId = Object.entries(params)[0][1];
        setError(videoId.length === 0);
        if (videoId.length > 0) {
            setSearching(true);
            const videoData = await getVideo({ videoId })
            if (videoData && videoData?.items?.length > 0) {
                const channelData = await getChannel({ channelId: videoData.items[0]?.snippet?.channelId });
                if (channelData?.items?.length > 0) {
                    setResult({
                        videoId: videoId,
                        name: videoData.items[0]?.snippet.title,
                        image: videoData.items[0]?.snippet?.thumbnails?.maxres?.url ?? videoData.items[0]?.snippet.thumbnails?.high?.url,
                        duration: videoData.items[0]?.contentDetails?.duration,
                        channel: {
                            id: channelData?.items[0]?.id,
                            name: channelData?.items[0]?.snippet?.localized?.title,
                            image_channel: channelData?.items[0]?.snippet?.thumbnails?.default?.url
                        }
                    })
                } else {
                    setError(videoId.length === 0);
                }
                setSearching(false);
            }
        }
    }

    const handleCloseModal = () => {
        onClose();
        handleCleanResults();
    }

    const handleSubmitVideo = async () => {
        setAdding(true)
        const resp = await addVideo({
            name: result.name,
            category_id: categorySelect,
            link: result.videoId,
            image: result.image,
            duration: result.duration,
            channel_link: result.channel.id,
            channel_name: result.channel.name,
            image_channel: result.channel.image_channel
        })

        if (resp === 'already exists') {
            setAdding(false);
            setExsistError('Це відео вже в наявне в базі');
        } else if (resp === 'error') {
            setAdding(false);
        }else {
            setExsistError(null);
            setAdding(false);
            handleCloseModal();
        }
    }

    useEffect(() => {
        if (!visible) {
            setCategotySelect(categoryId ?? 'default');
        }
    }, [visible, categoryId])

    return (
        <Modal
            title="Додати нове відео"
            okText="Додати"
            cancelText="Відмінити"
            visible={visible}
            okButtonProps={{ disabled: !result || categorySelect === 'default' || existError}}
            onCancel={handleCloseModal}
            onOk={handleSubmitVideo}
            confirmLoading={adding}
            destroyOnClose
        >
            <StyledSearch>
                <StyledInput>
                    <Input
                        value={searchInput}
                        onChange={e => {
                            setSearchInput(e.target.value);
                            setError(false);
                            setResult(null);
                        }}
                        allowClear="true"
                        status={error && 'error'}
                        disabled={searching}
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        disabled={searchInput.length === 0}
                        onClick={handleSearchVideo}
                        loading={searching}
                    />
                </StyledInput>
                {
                    result &&
                    <>
                        <FoundedVideo
                            title={result.name}
                            link={result.link}
                            image={result.image}
                            onCancel={handleCleanResults}
                            error={existError}
                        />
                        {
                            !existError &&
                            <StyledSelect>
                                <Select
                                    options={[
                                        { label: 'Виберіть категорію', value: 'default' },
                                        ...categories.map(c => ({ label: c.name, value: c.id }))
                                    ]}
                                    className="search-video-category-select"
                                    value={categorySelect}
                                    onChange={(value) => setCategotySelect(value)}
                                />
                            </StyledSelect>
                        }
                    </>
                }

            </StyledSearch>
        </Modal>
    )
}

const StyledSearch = styled.div`
    text-align: center;
`;

const StyledInput = styled.div`
    display: flex;
    span {
        border-radius: 2px 0 0 2px !important;
    }
    button {
        border-radius: 0 2px 2px 0  !important;
    }
`;

const StyledSelect = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;
