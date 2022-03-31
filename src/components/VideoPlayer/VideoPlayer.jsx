import React from "react";
import styled from 'styled-components';
import { Modal } from "antd";

export const VideoPlayer = ({ videoId, onClose }) => {
    return (
        <Modal
            visible={!!videoId}
            footer={null}
            wrapClassName="video-player-modal"
            width={'1000px'}
            onCancel={onClose}
            destroyOnClose
        >
            <StyledVideo>
                <iframe
                    width="100%"
                    height="520"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen"
                >

                </iframe>
            </StyledVideo>
        </Modal>
    )
}

const StyledVideo = styled.div`
    padding: 20px 10px;
`;
