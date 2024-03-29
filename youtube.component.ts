import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
  standalone: true,
  imports: [
    YouTubePlayerModule,
    CommonModule,
    FormsModule
  ],
})

export class YoutubeComponent implements OnInit {
  users: any[] = [];

  user: any = {};
  userComment: String = '';

  videoPath: string = '';
  comments: string = '';
  likes: number | undefined;
  showForm: boolean = false;

  extractVideoId(videoPath: string): string {
    const videoId = videoPath.split('=')[1];
    return videoId;
  }
  
  likeVideo(user: any) {
    this.updateData(user._id, { likes: user.likes + 1 });
  }

  dislikeVideo(user: any) {
    this.updateData(user._id, { likes: user.likes - 1 });
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8000/getData").subscribe(
      (response: any) => {
        console.log(response);
        this.users = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateData(userId: string, newData: any) {
    const apiUrl = `http://localhost:8000/updateData/${userId}`;
    this.http.put(apiUrl, newData)
      .subscribe(response => {
        console.log('Data updated successfully:', response);
      }, error => {
        console.error('Error updating data:', error);
      });
  }

  createData() {
    const newData = {
      videoPath: this.videoPath,
      comments: [this.comments],
      likes: this.likes || 0
    };

    this.http.post('http://localhost:8000/createData', newData)
      .subscribe(response => {
        console.log('Data created successfully:', response);
      }, error => {
        console.error('Error creating data:', error);
      });
  }

  updateComments(userId: any) {
    this.user.comments = this.user.comments || [];
    if(this.userComment){
    this.user.comments.push(this.userComment);
    this.updateData(userId, { comments: this.user.comments });
    }
  }

  deleteComments(userId: string, commentIndex: number) {
    const user = this.users.find(user => user._id === userId);
  
    if (user && user.comments && user.comments.length > 0) {
      const validIndex = commentIndex >= 0 && commentIndex < user.comments.length;
  
      if (validIndex) {
        this.delete(userId, commentIndex);
      }
    }
  }

  delete(userId: string, commentIndex?: number) {
    let apiUrl = `http://localhost:8000/deleteData/${userId}`;

    if (commentIndex !== undefined) {
      apiUrl += `/?index=${commentIndex}`;
    }  
    this.http.delete(apiUrl)
      .subscribe(response => {
        console.log('Comment deleted successfully:', response);
      }, error => {
        console.error('Error deleting comment:', error);
      });
  }
  
}
