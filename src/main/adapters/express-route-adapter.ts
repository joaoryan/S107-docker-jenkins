import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Request, Response } from 'express'
import fs from 'fs'

export const adptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      if (httpResponse.download) {
        res.status(httpResponse.statusCode).download(httpResponse.download, async (err) => {
          if (httpResponse.file) {
            const { filePath, folderPath } = httpResponse.file
            try {
              if (fs.existsSync(filePath)) await fs.promises.unlink(filePath)
              if (fs.existsSync(folderPath)) await fs.promises.rmdir(folderPath)
            } catch (error) {
              console.log('[adptRoute.httpResponse] => error: ', error)
            }
          }
          if (err) {
            console.log('[adptRoute.httpResponse] => error: ', err)
            res.status(500).json({ error: 'Error downloading the file.' })
          }
        })
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
