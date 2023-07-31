import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { socket } from '../../socket'
import { useDispatch, useSelector } from 'react-redux'
import { usePeer } from '../../features/user/peer'
import { Button, Grid } from '@mui/material'
import ReactPlayer from 'react-player'





const VideoCall = () => {
    const [myStream, setMyStream] = useState(null)
    const [remoteUserId, setRemoteUserId] = useState(null)

    const { peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream, isInitialOfferCreated } = usePeer()

    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        setMyStream(stream);
    }, [])
    const handleNewUserJoined = useCallback(async (data) => {
        const { authUserId } = data
        console.log("new user joind id", authUserId)
        const offer = await createOffer()
        socket.emit('call-user', { authUserId, offer })
        setRemoteUserId(authUserId)
    }, [createOffer, socket])



    const handleIncomingCall = useCallback(async (data) => {
        const { from, offer } = data
        console.log("incomming call from", from, "this si offer", offer)
        const ans = await createAnswer(offer)
        console.log("creating my abnswer", ans)
        socket.emit('call-accepted', { authUserId: from, ans })

    }, [createAnswer])

    const handleCallAccepted = useCallback(async (data) => {
        const { ans } = data
        console.log("call got accepted", ans)
        await setRemoteAns(ans)

    }, [setRemoteAns])

    const handleNegitiationNeeded = useCallback(() => {
        console.log("negitiation needed")

        if (isInitialOfferCreated) {

            const localOffer = peer.localDescription;
            console.log("negotiation done and reconnected", localOffer)
            socket.emit('call-user', { authUserId: remoteUserId, offer: localOffer })
        }
    }, [isInitialOfferCreated, remoteUserId, peer])


    const handleStopCall = useCallback(() => {
        // Stop sharing the local video stream
        if (myStream) {
            myStream.getTracks().forEach((track) => track.stop());
            setMyStream(null);
        }

        setRemoteStream(null);

        if (peer) {
            peer.close();
        }

        setIsInitialOfferCreated(false);

        setAddedTracks([]);

        socket.emit('call-ended', { authUserId: remoteUserId });

        setRemoteUserId(null);
    }, [myStream, peer, remoteUserId]);


    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegitiationNeeded)

        return () => {
            peer.removeEventListener('negotiationneeded', handleNegitiationNeeded)

        }

    }, [])

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined)
        socket.on('incoming-call', handleIncomingCall)
        socket.on('call-accepted', handleCallAccepted)

        return () => {
            socket.off('user-joined', handleNewUserJoined)
            socket.off('incoming-call', handleIncomingCall)
            socket.off('call-accepted', handleCallAccepted)

        }
    }, [handleNewUserJoined, socket])



    useEffect(() => {
        getUserMediaStream()

    }, [getUserMediaStream])



    return (
        <>
            <div>VideoCall</div>
            <Grid>
                {console.log("watching my stream", myStream)}
                <ReactPlayer url={myStream} playing={true} muted />
                <ReactPlayer url={remoteStream} playing={true} />

                <Button onClick={e => sendStream(myStream)} >share my video</Button>
                <Button onClick={handleStopCall}>Stop Call</Button>


            </Grid>
        </>
    )
}


export default VideoCall