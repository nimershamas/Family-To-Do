import React, { useState } from 'react';
import './taskDetails.css';
import { Link } from 'react-router-dom';

function TaskDetails() {
    const [message, setMessage] = useState("");
    const [responseClass, setResponseClass] = useState("");
    const [editDivClass, setEditDivClass] = useState("editDivHidden");
    const [content, setContent] = useState("");
    const showEditDiv = e => {
        e.preventDefault();
        if (editDivClass == "editDivHidden")
            setEditDivClass("editDivShown");
        else
            setEditDivClass("editDivHidden");
    }

    const editContent = e => {
        let newcontent = document.getElementById("content").value;
        setContent()
        fetch('/editContent', {
            method: 'POST',
            body: JSON.stringify({ taskContent: newcontent }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => {
                if (data.successful === true) {
                    setResponseClass("successResponse");
                    setMessage("edit has been done!")
                    setContent(data.taskContent);
                } else {
                    setResponseClass("failedResponse")
                    setMessage("something wrong has been happend try again!")
                }
            })
    }

    return (
        <div className="mainWrapper">
            <div className='boxContainer'>
                <div class="profileInfoDiv">
                    <Link to="/"><img src="https://image.flaticon.com/icons/svg/626/626027.svg" className="previous" />
                    </Link>
                    <p className="userName" id="userName">morad</p>

                    <img alt="profileImg" id="profileImg"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAAD7CAMAAAD3qkCRAAAAYFBMVEWAgYP///99foB6e32BgoT5+fmIiYvx8fF3eHr39/eEhYf8/Pzt7e3j4+SnqKmOj5GztLXFxcbV1dbc3Nzl5eWXmJq+vr/MzM2bnJ6io6Ssra6MjY+4uLnDw8TR0dKTk5Uc6mfYAAAJZklEQVR4nO2dibKiOhCGMWET2QQUwe3933JQRMKiQvrnRKfyV03VrVNzh3wnnXQn6XSM1f8iQ3UDYNIk3ydN8n3SJN8nTfJ90iTfJ03yfdIk3ydNMkOW42dZFlR/HGvBzyxM4if5qSx2la7Vn6I8bRNnoU8tSLIJToerbbKOTHsX5uslPrcYSRraRtVyY6Dbz4oU/8FFSNbZ3nNHIFoaN7qgrWwBEv9SGPwNxqNnDmAjg5Nk592YTY2xhFAbA5P48dWYxHFnOe6B0zKWpDSn9ceTZZfBvg0k2Vzsj8NjaGKXDejzOBInnm5XgvgeNInBSIJidoc8uqXEoKBI/EimQ2odfEQLQCTrnTyIwSJEr2BI1gUBpELxACgQks2JwnFDudINDEKS2qQuuaEcyI4FQWJRBkmDUlANDEGyl5x/uygl0UUCSNYuAMQw3K1ykpJuWzUKbajQSXwbA1JNYKShQifZg0AqnZSSOAeQcVU6UpZeZJIcxlHFxSFhQUwlWaPG+11eoo4kOwJBDBbKL4epJBeEVxRQ5EcKkcQKkcZ16xRVJI4HBanco/SYJ5KkmEilFc8VkcRY47qF94pICKv3F5JePhJJ0MZlGOZFCUmGJ2GxEpIz1pvcSQolJGBvcifZSW5O0EiuC5BEgQISB7XIEnWUjCJJJNkSJJ6kbySRXNCxijKSrbkACdsrIKFuoo6KqyBZYBLWJEQS6BpeKcki44SdFZAsMncpmYWTJfyJ7PYdiQS2JSyI7SSXWt8XQcrurtBITvj1iSE5dRFJ4Fsr1YCXDOqp63i4dbGjbFOIJLRz+BFx2WU8lSRBDxT5IzoiyRo8D8sbF5VkA569uGSoQidZpVAQw5TP+qCSONAxzwjHc191zmgwhadzqwR4PMcoOWvkE9MYB2IYlIQPKkkCXaKEhCwJ6iyM3eNmZ/mEIuqJKXgpz5TNwuizX1f2HOjrSLg6ErB1qSPZQDIHv4IEfD6njmS1xZK46iJI8EpeJQm2T2x5J08lCaCLRnZUR5JB8z1Urk98YELnLZFbXc6dA3XynBDWk1da0C0JV+WaEbr6tQkJw2SSDHBloxG7ElLr6dnowBiSMnUBSIAeRTapAESyimFj3pOPHzE3aVDmJZ3ahSKBxV7SiYMwEtAVFH4gXf2HkEAuPFDvNGLumPoAp0LxijgSQLYEJeS6C0TiUIN7VlLrY6Bule9pJNIZqa1g9+OJfULx7rVgNQtI0xfxKuNdMJKM4h5d6VsnrWAkG8ri0QQ0AFfbI5BP9iLsPLbCkaxLWftiO0QpHGDlGOkMPIboEiSJbFkM0olvK2RdokRu9cj3kII+0ApLctMXNXR8CEqSyJCQNlQEYate/T8kMrmqqBpeWBKZ7W56pZVa30CCqdz3BSQhpqoalkTGobAS820oiSU1d5Fqk7SCkgQyJKZ8EmdHUBKpxbxJ3VR5CEoiFUKCghUoSXb8X0hSqVg4gsT0YOuSOkk5ggqOgj2jBArpSE4QjmRTNciaHUIyL95jJi8ciXULOrKZKOxwWa335J3Um3D7XXVzkjnzF/P2t+HunxD2hduDfPxit9NB+DWtg8eUviuM3Bdu/iOf2CnMaMOUC8CnoEhO7a91UoUfZhbi6JC9jikIRJLaUbvKmHBpgEVncWwkbkzehgSdMx6YUIXH+nhHm4cdd2jtmOy95VYQEqsyKHHpZ703MO71StXnZtVJVFcPqQB7j1JsMTdra75kYUbRi7TueXuMdhoPIXGKe6Yt72T+5a8K9fLdYD/7fP+r8ncya5FJ1snuEWwdO646Hd2dYHY5CH2bw3z5cmp3UW9m5qHXtJifOpskfjy0MHZIhhspW9ZQkqIWWjWf084TWttLW7aSXiV+xk8jbqM9yleVSxTEUe/tg0Gaw7oU/gJ78TsXFjXsr+9pWU6WF8zlfeNhu8FfTZ6xMbPHgytHTMzn/WlthmaT+GkeX9mAom7IsB1ZWb+RwF49Q9NdZ/JDnkl6+3kkfh4XNn/5nsZY0Rcrvw0lO39hN/2iGoxfy63UyJ9B4uTh1RvvjKYZ0dj/V62+XpdDHUYDjJlRsZ/v8SeTpIX3+XGT0SIQhfH6NkYwusasvuNd45lDZhKJ5efR2xeMnk0Y+un13XGy46j1b06vgxru2mU64y2xCSROGh8ncYyVfWku143vmQbv08IYP5ZJNjEe+0gSnAtv+t6P3U/xbwrIscOIfX2+eccYj8pzOuWE5T2JkxfRrJd/+kcIbYKkORJVTaoGxBg7FvFIlDODJA3t18H5i892Dw2FcTB2nDj5xgdjnv3pzapXJOtszyYOju43O+Yl3qwbhrrOrHt3VXPC5M0MMEqyDvIDl8sM4ifhW2tx82s4G8zeRmauF+evZoARkiAv7bcO8O3HxJdyutbT7xSpmlnVdBZuR2eAPomVlzNeKRsRb825V8KzXxVGtl40Y1E4EgN0SbLyOPOVsuF32vpb/YScbmrdB1/ynsWwd+eelbUklnOyXSLGTW4zUAa1SLuOnpphzPnh4mwGJJafhFx6cHTUDIexbELB0QNS8Zl7jAOnQ7JO4isGw2irm49Yj+jot4jvMW6Guf8kcbaF/Fw1Iq/+p0eOUoSLGbDHRpi5q99GNFanaK4j/6R6D36kjJQQKge4C53MuG6r8WIUMp78/b982LzoFGGVArwFeTMyI/ZJvuOFoodL6R8KCV3io2uxIYeHoMcRz6bXKUJBAnAhjaX0DHu7pRlEH49/RWEZPRM4QvFXz9u1i7NE6dgl9KxW1wkS3Xa7IvgVkqcH3JxFK2pnLuhV9GXV/PqFmZjt2pBvkWLRi6gdEm2cKOSnIJ5B/CvZTZDaBsQCSRCpbNs8PUd3OyIEkvxXBrwhrLfaCkwtyUb69pAKmfWiSggj21xtxC3hv9PjxpJwS7u9s5guUYh8MT3MyxfTVRsScKWshcXqRE3RkJrSwcgXHf9CdSKKWPijWeBnvwXyeKBQLNrbXAX4LeNqLi1dXPEn9XT2Y8ZVNTzvF/Tj9TD5sS6pqxB0y0XWjv/XjKuSmfWundaH3L+yXBTEtyuns5K/7+lRixuoEDtsnO5Pbnt6xO1gNeKO3zu12stdSlMufuo9McCKVQB9VffPZPerqkbBWU1LyOqH76yEP2nxRxo02/upgF5LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLa5b+AcsFoXpalAkyAAAAAElFTkSuQmCC" />
                </div>
                <h5>task contents :</h5>
                <p className="taskContent" id="taskContent">{content}</p>
                <button className="editButton" onClick={showEditDiv}>edit content</button>
                <div className={editDivClass}>
                    <textarea className="updateTask" id="content"></textarea>
                    <button className="editButton" onClick={editContent}>save</button><br></br>
                    <div class={responseClass}>{message}</div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails;